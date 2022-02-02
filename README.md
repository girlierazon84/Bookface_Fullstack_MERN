### Fullstack MERN final inlämningsuppgift

### Projekt Mohammad och Girlie

1. Först clone från Github och sen för installera alla packet ``npm i``
2. För att köra frontend då kör man `npm run start`
3. För att köra backend då kör man `npm run startts`

Det är sista inlämning på vår utbildning och inlämning är att man skapar en applikation som heter bookface och det ska
skapa en användare, man kan logga in man kan logga ut, och man skriva ett inlägg. På detta projekt kommer vi att använda
mongoDB, express, react, nodeJs och vi kommer att använda typescript på react på frontend.

#### Jira

Vi har använt [Jira](https://girlie-razon84.atlassian.net/jira/software/c/projects/BMFP/issues) som scrum för att
planera vårt projekt innan dessa använde vi Trello.

#### Description :

Projektet består av en hemsida där kan man skapa en användare och logga in och logga ut. Det är också att man kan göra
ett post för användare.

### Dokumentation :

1. skapat Database som usersApi.
2. skapat backend och frontend.
3. Jag har använt MongoDB på databas.
4. Har använt nodejs i backend.
5. Har använt React typescript på frontend.
6. jag ska dela dokumentation till två delar backend och frontend

## Backend

1. jag har börjat med skapa backend mapp.
2. började med ``npm init -y`` .
3. installerat express med ``npm i express``
4. installerat dotenv ``npm i dotenv``
5. installerat nodemon ``npm i -D nodemon``
6. skapat src mapp i backend folder.
7. Updaterat package.json.
8. installerat NodeJs med TypeScript ``npm i --save-dev typescript``
9. ``npm i --save-dev tslint``
10. skapat `tsconfig.json`
11. göra det på så sätt<Details> {
    "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "noImplicitAny": true,
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
    "*": [
    "node_modules/*"
    ]
    } },
    "include": [
    "src/**/*"
    ]
    } </Details>
12.
13. `npm run startts` för att köra servern.
14. `npm run start` för att köra frontend.
15. Skapa folder Bookface.
16. skapa backend folder.
17. skapa configuration folder.
18. skapa ApplyMiddleWares ts fil.
19. skapa middleware variable i ApplyMiddlewares.
20. skapa configuration ts fil.
21. skapa statusCode ts fil.
22. skapa connect to database funktion i configuration ts fil.
23. skapa connect to port funktion i configuration ts fil.
24. skapa controllers folder.
25. skapa user controller ts fil.
26. skapa encryptPassword function i user controller ts fil.
27. skapa create user function i user controller ts fil.
28. skapa verifyUser function i user controller ts fil.
29. skapa get all user function i user controller ts fil.
30. skapa get user byId function i user controller ts fil.
31. skapa getUserByQuery function i user controller ts fil.
32. skapa update user function i user controller ts fil.
33. skapa delete user function i user controller ts fil.
34. skapa Middlewares folder i backend.
35. skapa Middlewares ts fil i Middlewares folder.
36. skapa morgan middlewares ts fil i Middlewares folder.
37. skapa not found variable i Middleware ts fil.
38. skapa Error handler variable i Middleware ts fil.
39. skapa stream variable i MorganMiddleware ts fil.
40. skapa skip variable i MorganMiddleware ts fil.
41. skapa Models folder.
44. skapa Post model i models mapp.
45.
    33. skapa user model i models mapp.
48. skapa PostSchema variable i PostModel ts fil.
49. skapa schema variable i userModel ts fil.
50. skapa Routes mapp.
51. skapa AliveRoutes ts fil i routes mapp.
52. skapa routes variable i AliveRoutes ts fil.
53. skapa UserRoutes ts fil i routes mapp.
54. skapa usersUrl i userRoutes ts fil.
55. skapa usersUrl with id i userRoutes ts fil.
56. skapa searchUsers url i userRoutes ts fil.
57. skapa verifyUser url i userRoutes ts fil.
58. skapa routes variable för alla request.
59. skapa utils mapp.
60. skapa crypts ts fil i utils mapp.
61. skapa create password variable i crypts ts fil.
62. skapa Logger ts fil i utils mapp.
63. skapa level variable i Logger ts fil.
64. skapa colors variable i Logger ts fil.
65. skapa format variable i Logger ts fil.
66. skapa transport variable i Logger ts fil.
67. skapa interface mapp i utils mapp.
70. skapa posts ts fil i interface mapp.
71. skapa users ts fil i interface mapp.
72. skapa server.spec för tester i backend.
73. skapa API alive test i server.spec ts fil.
74. skapa userRoutes för tester i backend.
75. skapa randomString variable i userRoutes ts fil.
76. skapa updateUser variable i userRoutes ts fil.
77. testa route not exist.
78. testa createUser.
79. testa GetAllUsers.
80. testa updateUser.
81. testa DeleteUser.
82. installera node typescript ``npm i --save-dev @types/node "types/express``
83. installera nodemon ``npm i --save-dev nodemon``
84. skapa nodemon.json.
85. installera cors ``npm i cors``
86. ``npm i --save-dev @types/cors``
87. installera Winston ``npm i winston``
88. installera morgan ``npm i morgan @types/morgan``

## frontend

1. Skapa Frontend mapp med React ts.
2. skapa components mapp i frontend mapp.
3. skapa Nav mapp i components mapp.
4. skapa Navbar ts fil i Nav mapp.
5. skapa displayUserIfAuthenticated funktion i navbar ts fil.
6. styla navbar med avancerad css.
7. skapa users mapp i components mapp.
8. skapa alive ts fil i users mapp.
9. skapa alive funktion i alive ts fil.
10. skapa knapp alive i alive ts fil.
11. skapa knapp clear eller ta bort i alive ts fil.
12. styla knappen och navbar med avancerad css.
13. skapa createUsers ts fil i users mapp.
14. skapa createUsers funktion i createUsers ts fil.
15. skapa input fält för first name, last name, mail och lösenord i createUsers ts fil.
16. skapa knapp submit i createUsers ts fil.
17. skapa knapp clear eller ta bort i createUsers ts fil.
18. styla input fält och knappar med avancerad css.
19. skapa deleteUsers ts fil i users mapp.
20. skapa deleteUser funktion i deleteUser ts fil.
21. skapa input fält i deleteUser ts fil.
22. skapa knapp deleteUser i deleteUser ts fil.
23. skapa knapp ta bort i deleteUser ts fil.
24. styla input och knappar med avancerad CSS i deleteUser ts fil.
25. skapa getAllUsers ts fil i users mapp.
26. skapa getUsers funktion i get all users ts fil.
27. skapa getUsers funktion i getAllUsers ts fil.
28. skapa knapp för getUsers i getAllUsers ts fil.
29. skapa ta bort knapp i GetAllUsers ts fil.
30. skapa JsonTable för att koppla till databas.
31. styla knappar i getAllUsers ts fil med avancerad css.
32. skapa GetUsersById ts fil i users mapp.
33. skapa getUsersById funktion i getUsersById ts fil.
34. skapa getUsers funktion i getUsersById ts fil.
35. skapa input fält i getUsersById ts fil för att hämta användare via id.
36. skapa knapp för att hämta användare.
37. skapa knapp ta bort för att rensa.
38. styla input fält och knappar i getUsersById ts fil med avancerad css.
39. skapa updateUser ts fil i users mapp.
40. skapa updateUser funktion i updateUser ts fil.
41. skapa input fält för firstname, lastname, email och lösenord i updateUse ts fil.
42. skapa knapp för uppdatera användare i updateUser ts fil.
43. skapa knapp för rensa i updateUser ts fil.
44. styla content, input och knappar med avancerad css i updateUser ts fil.
45. skapa CustomButtonComponent i components mapp.
46. skapa primaryButton variable i customButtonComponents ts fil.
47. skapa secondaryButton variable i customButtonComponents ts fil.
48. styla knappar med avancerad css i customButtonComponents ts fil.
49. skapa footer ts fil i components mapp.
50. lägga en bild för footer.
51. styla content i footer ts fil med avancerad css.
52. skapa navigationBar ts fil i components mapp.
53. skapa displayUserIfAuthenticated variable i navigationBar ts fil.
54. skapa input fält i navigationBar ts fil.
55. styla navigationBar ts fil med avancerad css.
56. skapa profile ts fil i components mapp.
57. skapa en bild och settings knapp och profile knapp för dropdown i profile ts fil.
58. styla dropdown profile ts file med avancerad css.
59. skapa profile css fil för styla dropdown med avancerad css.
60. skapa routes mapp i src mapp.
61. skapa routingPath ts fil i Routes mapp.
62. skapa Routing ts fil i routes mapp.
63. skapa utils mapp i src mapp.
64. skapa api mapp i utils mapp.
65. skapa userApi i api mapp och importera axios.
66. skapa service mapp i api mapp.
67. skapa userService ts fil i Service mapp.
68. skapa url users och verifyUser i userService ts fil.
69. importera alla request i userService ts fil.
70. skapa global mapp i utils mapp.
71. skapa global ts fil i global mapp
72. skapa fonts mapp i global mapp.
73. importera fonts i fonts mapp.
74. styla fonts i global ts fil.
75. skapa provider mapp i utils mapp.
76. skapa userProvider ts fil i provider mapp.
77. exportera createContext, useContext i userProvider ts fil.
78. skapa interface mapp i utils mapp.
79. exportera createUser, UserData and logInUser i usersInterface ts fil.
80. skapa PostInterface ts fil i interface mapp.
81. exportera CreatePostObject i postInterface ts fil.
82. exportera postDataObject i post interface ts fil.
83. skapa View mapp i src mapp.
84. skapa adminView ts fil i view mapp.
85. styla adminView fil med avancerad CSS.
86. skapa CreatePostView i View mapp.
87. import och export content i createPost ts fil.
88. skapa HomeView ts fil i view mapp.
89. skapa två knappar i HomeView ts fil.
90. skapa taggan till homeView ts fil.
91. styla homeView ts fil med avancerad CSS.
92. skapa PageNotFountView ts fil i View mappen för att visa att sidan inte finns.
93. skapa ProfileView ts fil i view mapp.
94. lägga till en bild i ProfileView ts fil.
95. styla ProfileView med avancerad CSS.
96. skapa SettingsView ts fil i view mappen.
97. skapa signUpFromView ts fil i view mappen.
98. skapa UserLogInView ts fil i view mappen.
99. skapa username, password, login Variable i UserLogInView ts fil.
100. skapa verifyUser, login, funktioner i UserLogInView ts fil.
101. skapa två input fält i UserLogInView ts fil.
102. styla UserLogInView ts fil med avancerad CSS.
103. skapa posts mapp i components mapp.
104. skapa CreateNewPost ts fil i posts mapp.
105. skapa author, title, content, postObject variable i CreateNewPost ts fil.
106. skapa createPosts, clearInputs funktioner i CreateNewPost ts fil.
107. styla CreateNewPost med avancerad CSS.
108. skapa DeletePostById ts fil i posts mapp.
109. skapa text, id variabler i DeletePostById ts fil.
110. skapa deletePost, clearInputs funktioner i DeletePostById ts fil.
111. skapa två knappar i DeletePostById ts fil för att rensa inlägget.
112. styla DeletePostById ts fil med avancerad CSS.
113. skapa getAllPosts ts fil i posts mapp.
114. skapa setAllPostsInDatabase variable i getAllPosts ts fil.
115. skapa getPosts funktion i getAllPosts ts fil.
116. skapa två knappar i getAllPosts ts fil för att hämta post och lägga post i Database.
117. styla content i getAllPosts ts fil med avancerad CSS.
118. skapa GetPostById ts fil i posts mapp.
119. skapa onePost, id variabler i getPostById ts fil.
120. skapa getPosts, ClearInputs funktioner i getPostById ts fil.
121. skapa input fält i getPostById ts fil.
122. skapa två knappar i getPostById ts fil för att hämta inlägg och ta bort inlägget.
123. styla content i getPostById ts fil med avancerad CSS.
124. skapa updatePost ts fil i posts mapp.
125. skapa postObject, id, author, title, content variabler i updatePost ts fil.
126. skapa updatePost funktion i updatePost ts fil.
127. skapa clearInputs funktion för att rensa all inputs fält i updatePost ts fil.
128. skapa fyra inputs fält för att hämta ett inlägg och detaljer.
129. styla content i updatePost ts fil med avancerad CSS.

### Den som gick bra

Jag lyckades att koppla backend med frontend och databas, fick bra humör som gjorde mig att göra mycket mer. Den som
gick bra det var att jag kunde skriva efter läraren och få motivation från hans videos. Den gick bra också med kodning
när jag få ett problem så jag kikar direkt på internet och hitta lösning för det på overflow. Den som gick bra det var
att jag har gjort detta projekt med Girlie som gjorde mig taggad för att hon ta hand mycket om design. Den som gick bra
det var att vi arbetat i team och kunde lösa problem och hjälpa varandra.

### Den som gick inte bra

1. Den som gick inte bra att jag har varit sjuk och att jag måste titta på läraren videos alltid för att lösa problem.
2. Den som gick inte bra att jag glömmer mycket och behöver alltid fråga, det kanske behöver att repetera mycket mer.
3. Den som gick inte bra att jag kunde inte lösa alla problem själv, jag frågar alltid min klasskamrat.
4. Den som gick inte bra att jag var osäker om jag skulle klara kursen eller inte.

### Vad har jag lärt mig

1. Jag har lärt mig hur jobbar man med ett team.
2. Att vara aktiv alltid med din kollega.
3. att försöka lösa problem med hjälp av kollegan.
4. Att vara tålmodig och försöka hitta lösning för kod innan det blir för mycket.
5. Lärt mig hur man jobbar på scrum.
6. Att strukturera mina mappar.
7. att känna mig inte ensam på projektet.
8. Lärde mig mycket annat från min klasskamrat.
9. jag tror att jag fick bra kunskaper som gjorde mig lite bättre på kodning.

### Vad är det som var svårt

1. Jag fick ett problem det är när jag skulle köra frontend att det kan inte körs för att det missar .env fil i frontend
   det lyckades jag lösa med skriva ``SKIP_PREFLIGHT_CHECK=true``.
2. Det var svårt också att ibland servern är på gång och jag försöker köra backend dem det körs inte på grund att den är
   upptagen på ett annat port.
3. Det var också svårt att strukturera mappar men jag löste med att kolla på lärarens videos.
4. Det var svårt också att skapa användare och logga in men löste det med kolla på lärarens video.

## <u>Problem</u>

- Hur ska man skapa ett inlägg

## <u>Lösningar</u>

### Backend:

- skapat PostModel ts fil.
    1. skapat NewPostSchema variable för skapa ett post.

- skapat post interface

- Skapat PostController ts fil
    1. skapat createPost funktion för att skapa en användare
    2. skapat getAllPost funktion för att hämta all post
    3. skapat getPostById funktion för att hämta post via id
    4. skapat updatePost för uppdatera post
    5. skapat deletePost funktion för att ta bort post

- skapat PostRoutes.
- Lägg `MONGODB_COLLECTION_POST=Post_api` till `.env` fil

### Frontend:

- skapat PostsApi ts fil
- skapat postInterface
- exporterat interface CreatePostObject, PostDataObject
- skapat PostService ts fil
- Skapat variabler för att skapa användare, hämta användare, uppdatera användare, delete användare

- Vi har skapat CreateNewPost ts fil:
    1. I createNewPost skapade vi author, title, content, postObject som variabler
    2. skapade en funktion för att skapa ett inlägg
    3. skapade en funktion för att rensa inlägg
    4. skapat inputs fält för varje variable

- Skapat GetAllPosts ts fil:
    1. skapat en funktion för att hämta all inlägg

- Skapat getPostById ts fil:
    1. skapat post variable och id variable
    2. skapa en funktion för att hämta post
    3. skapa en funktion för att rensa inputs fält

- Skapat updatePost ts fil:
    1. skapat postObject, id, author, title, content variabler
    2. skapat updatePost funktion för att uppdatera inlägget
    3. skapat en funktion för att rensa all inputs fält
    
- Skapat DeletePostById:
    1. skapade två variabler för text och id
    2. Skapat funktion för att rensa inlägget
    3. Skapat en funktion för att rensa inputs fält