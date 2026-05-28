# Stage 1: Install dependencies and compile Prisma schemas
FROM node:18-alpine AS builder
WORKDIR /app

# Copy lockfiles and installation specifications
COPY package*.json ./
COPY prisma ./prisma/

# Install standard packages
RUN npm ci

# Generate type-safe Prisma client binaries
RUN npx prisma generate

# Copy the rest of the application files
COPY . .

# Run production Next.js compiler
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Stage 2: Final lightweight runner container
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED 1

# Create runner user account for security isolation
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy compiled assets from builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000

# Start production server
CMD ["npm", "run", "start"]
