#Technology:  Typescript Express Prisma connect database postgresSQL
#Feature:  API Cookie Authentication UploadFile CURD


#Postgres Database schema

model User {
  id       String   @id @default(cuid())
  email    String   @unique
  password String
  avatar   String
  name     String
  created  DateTime @default(now())
  posts    Post[]
}

model Post {
  id       String   @id @default(cuid())
  title    String
  picture  String?
  content  String?
  created  DateTime @default(now())
  author   User     @relation(fields: [authorId], references: [id])
  authorId String
}
