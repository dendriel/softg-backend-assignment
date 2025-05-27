import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as fs from 'fs';

/**
 * This script reads a JSON file and seeds the data into a Firestore collection.
 * 
 * Usage:
 * node data-seeder.js <filePath> <collection> [keyProperty]
 * 
 * filePath: Path to the JSON file containing the data to seed.
 * collection: Target collection in Firestore where the data will be seeded.
 * keyProperty: Optional. The property to use as the document ID. Defaults to 'id'.
 */

const args = process.argv.slice(2);

const filePath = args[0];
const collection = args[1];
const keyProperty = args[2] || null; // optional. 'id' field will be used as default.

if (!filePath || !collection) {
    console.error('Usage: node data-seeder.js <filePath> <collection> [keyProperty]');
    process.exit(1);
}

process.env.FIRESTORE_EMULATOR_HOST = 'localhost:5003';

// TODO: allow to use credentials so we can manage production enviroments.
initializeApp({ projectId: 'demo-project' });

const db = getFirestore();

/**
 * Reads a JSON file and returns its content as an array of objects.
 * @param filePath Path to the JSON file.
 * @returns Parsed JSON data or null if an error occurs.
 */
function readJsonFile(filePath: string): any[] | null {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
        return null;
    }
}

/**
 * Reads a JSON file and seeds the data into a Firestore collection.
 * @param filePath Path to the JSON file containing the data to seed.
 * @param collection Target collection in Firestore where the data will be seeded.
 */
async function seedData(filePath: string, collection: string) {
    
    const data = readJsonFile(filePath);
    if (!data) {
        console.error('No data to seed.');
        return;
    }

    // Batching allows us to write multiple documents in a single request.
    // TODO: batching is limited to 500 writes per batch. Add logic to split large datasets.
    if (data.length > 500) {
        console.error('Data size exceeds batch limit of 500 writes.');
        return;
    }

    const batch = db.batch();

    data.forEach((item) => {
        // Requires each item to be an object with an "id" property. This allows the script to be idempotent,
        // meaning it can be run multiple times without duplicating data; and allows to update existing items.
        // We could relax this requirement by generating IDs automatically, but losing the idempotency feature.
        if (typeof item !== 'object') {
            console.error(`Invalid data format. Skipping item.`, item);
            return;
        }

        // Use provided keyProperty or default to 'id'
        const docId = keyProperty ? item[keyProperty] : item.id;
        if (!docId) {
            console.error(`Item is missing the key property '${keyProperty || 'id'}'. Skipping item.`, item);
            return;
        }

        const ref = db.collection(collection).doc(docId);
        batch.set(ref, item);
    });

    await batch.commit();
    console.log(`Firestore collection '${collection}' seeded with ${data.length} entries from ${filePath} data`);
}

// Seed data to Firestore
seedData(filePath, collection)
.catch((err) => {
    console.error(`Error seeding '${filePath}' data to collectionm '${collection}' in Firestore:`, err);
    process.exit(1);
});