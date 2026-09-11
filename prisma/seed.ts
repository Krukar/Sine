import { PrismaClient } from '../src/generated/prisma/client.js';

import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const SEED_USER = {
    id: 'm_BkAexUJyKQ',
    clerk_id: 'user_3GC8zaXvy32cPmdMBcCj0n7YNdO',
    username: 'Toronto Man',
    avatar_url:
        'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zR0M4emVONklyZjQ4WWMwbTEzS1VNVnYxdksifQ',
};

const SEED_VIDEOS = [
    { id: '0sBXLL', title: 'Only Premiere With No Plane', width: 504, height: 886 },
    { id: '2mstWy', title: 'God Bless The Weston Family', width: 720, height: 1280 },
    { id: 'bxah5P', title: 'Underground Kings', width: 1080, height: 1920 },
    { id: 'NJcXbE', title: 'Running Through The 6ix', width: 720, height: 1280 },
];

async function main() {
    console.log('🌱 Seeding database...');

    // Add default Toronto Man user
    const user = await prisma.user.upsert({
        where: { clerk_id: SEED_USER.clerk_id },
        update: SEED_USER,
        create: SEED_USER,
    });

    // Add default videos
    for (const video of SEED_VIDEOS) {
        await prisma.video.upsert({
            where: { id: video.id },
            update: { ...video, user_id: user.id, deleted_at: null },
            create: { ...video, user_id: user.id },
        });
    }

    console.log(`✅ Seeded 1 user, ${SEED_VIDEOS.length} videos.`);
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
