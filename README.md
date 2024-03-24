# Hetzner cost estimator
This is a super simple app that lets you estimate your monthly bill.

It uses the Hetzner servers & volumes api to get your currently running servers. We only look at your current running servers, not the ones you have launched in the past.

## Getting Started
Just enter your key and see the estimate.

## Roadmap
- [x] Call Hetzner `/servers` api
- [ ] Call `/volumes` api
- [ ] Factor in when the server was created
- [ ] Add deleted servers estimate (somehow)
