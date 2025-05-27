// all api list 
appRouter
post:  /signup
post: /login
post: /logout

profileRouter
get: /profile/view
patch: /profile/edit
patch: /profile/password

connectionRequestRouter
post: /request/send/intersted/:userId
post: /request/send/ignored/:userId
post: /request/send/accepted/:userId
post: /request/send/rejected/:userId

userRouter
get : /user/connection
get: /user/request/:userId
get: /user/feed

status: ignored, intersted, accepted, rejected



