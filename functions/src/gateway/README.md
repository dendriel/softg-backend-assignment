# Gateway Layer

The gateway layer/package should be used as the interface to access external services or applications. (https://martinfowler.com/articles/gateway-pattern.html).

It should abstract the details of external services from our application core. In a more purist approach, we would have to create contracts (interfaces) and consume them instead of accessing Firebase types directly. But creating adding this level of abstraction rarely pays off (it would help mocking the dependencies in unit testing thought).