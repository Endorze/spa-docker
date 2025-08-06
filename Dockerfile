# -------- STAGE 1: Builder --------
FROM node:20-alpine AS builder

WORKDIR /app

# Installera beroenden
COPY package*.json ./
RUN npm ci

# Kopiera övrig källkod och bygg
COPY . .
RUN npm run build


# -------- STAGE 2: Production --------
FROM node:20-alpine AS runner

WORKDIR /app

# Kopiera endast nödvändigt för produktion
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Miljövariabel för Next.js production mode
ENV NODE_ENV=production

# Starta Next.js (antag att du använder next start)
CMD ["npm", "run", "start"]