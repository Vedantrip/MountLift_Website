import { getSortedPostsData } from '@/lib/markdown';
import IntelligenceClient from './IntelligenceClient';

export default function IntelligenceFeed() {
  const posts = getSortedPostsData();

  // Pass the server-fetched data into the animated client UI
  return <IntelligenceClient posts={posts} />;
}