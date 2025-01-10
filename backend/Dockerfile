FROM node:18-alpine
ARG DATABASE_URL

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN apk add openssl

RUN npm install typescript -g

RUN npm install

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

ENV DATABASE_URL=${DATABASE_URL}
# Build TypeScript code
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]