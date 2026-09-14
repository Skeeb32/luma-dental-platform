# Pulse Platform API Reference

## Authentication

- API key: `x-api-key: <key>`
- OAuth2 bearer tokens for installed applications

## Base URL

`/api/v1`

## Core endpoints

- `POST /messages/send`
- `POST /messages/smart-send`
- `GET /conversations`
- `GET /contacts`
- `POST /contacts`
- `GET /contacts/segments`
- `POST /campaigns/send`
- `GET /campaigns/analytics`
- `GET /templates`
- `POST /templates/{id}/ab-test`
- `GET /automations`
- `GET /payments`
- `GET /reviews`
- `POST /media/upload`
- `GET /webhooks`
- `POST /webhooks`

## Representative workflow

1. Upsert contacts from CRM or website widget.
2. Resolve a segment from contact behavior.
3. Launch a campaign or transactional smart send.
4. Receive provider status callbacks and link click events.
5. Attribute replies, payments, and reviews back to campaign performance.

## Webhook events

- `message.sent`
- `message.delivered`
- `message.failed`
- `message.received`
- `contact.created`
- `payment.paid`
- `review.submitted`
- `link.clicked`
- `campaign.completed`
