import { MetadataRoute } from 'next';

// TODO: Implement sitemap generation logic based on your routes.
// This is a basic placeholder.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yourdomain.com'; // Replace with your actual domain

  // Define a type for the sitemap entries to ensure correctness
  type SitemapEntry = {
    url: string;
    lastModified?: Date | string;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
  };

  const staticRoutes: SitemapEntry[] = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/dashboard`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/reporting`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    // ... add other static routes with their appropriate metadata
  ];

  // Example: Fetch dynamic routes (e.g., member IDs)
  // const memberIds = await fetch('${baseUrl}/api/members').then(res => res.json()) as Array<{ id: string; updatedAt: string }>;
  // const dynamicMemberRoutes: SitemapEntry[] = memberIds.map((member) => ({
  //   url: `${baseUrl}/member-support/member-search/${member.id}`,
  //   lastModified: new Date(member.updatedAt),
  //   changeFrequency: 'monthly',
  //   priority: 0.6,
  // }));

  // Ensure the final returned array conforms to MetadataRoute.Sitemap
  const allRoutes: MetadataRoute.Sitemap = [
    ...staticRoutes,
    // ...dynamicMemberRoutes,
  ];

  return allRoutes;
} 