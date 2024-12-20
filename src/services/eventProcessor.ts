const delegatableEvents = ["click", "submit"] as const;

type EventName = (typeof delegatableEvents)[number];

type EventMap = Partial<Record<EventName, (event: Event) => void>>;

type Id = string;

const listenerMap = new Map<Id, EventMap>();

export function addEventListener(id: Id, eventMap: EventMap) {
  listenerMap.set(id, eventMap);
}

export function removeEventListener(id: Id) {
  listenerMap.delete(id);
}

export function delegateEvent() {
  delegatableEvents.forEach((eventName) => {
    const $root = document.getElementById("root");
    $root.addEventListener(eventName, (event) => {
      if (!event.target) return;
      const eventMap = listenerMap.get((event.target as HTMLElement).id);
      const handler = eventMap?.[eventName];
      if (!eventMap || !handler) return;
      handler(event);
      event.stopPropagation();
    });
  });
}
