# Pulse Mobile App Structure

Recommended mobile implementation:

- React Native with Expo for rapid delivery
- Shared API client package with the web app
- Offline inbox cache with optimistic sends
- Push notifications for inbound SMS, assignment changes, and payment events

Suggested screens:

- Inbox
- Conversation thread
- Contact profile
- Payments
- Reviews
- Campaign approvals
- Settings and notification controls

Suggested modules:

- `auth/`
- `inbox/`
- `contacts/`
- `payments/`
- `reviews/`
- `notifications/`
- `offline-sync/`
