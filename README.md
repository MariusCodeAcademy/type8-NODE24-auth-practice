# node 24 uzduotis

### 1 Auth: POST register (išsaugo vartotojo duomenis į users lentelę);

1. gaunam email ir pass
2. hash pass su brcyptjs
3. issaugom useri duomenu bazeje

### login

// paisimit email ir password
// paieskoti email duomentu bazeje
// jei randam patikri slaptazodi su bcrypt
// jei slaptazodis tinkamas,
// grazinti {success: true}
// sugeneruoti jwt token su userId
// grazinam vartotojui
