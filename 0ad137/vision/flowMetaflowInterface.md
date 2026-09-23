# Flow interface to Herder Metaflow

Source: living direct native message, 2026-09-23. Raw wording:

> Let's switch to using: what's the situation with Prometheus and the Flow Nexus? Let's get it working so that it's the interface to our Herder Metaflow.
>
> The Herder environment is a Metaflow in which there are many main flows, part of different aspects, and we can spawn more than one of these. Let's make Flow work and use it to interact with Herder and then we'll use it to implement messaging.
>
> Essentially the message component is going to have you create an interface to atomically deliver messages and receive messages so that we don't have to use the meta socket of Flow to send messages (which we can do now once Flow works), but Flow should atomically spawn a new session and then reap the old one.
