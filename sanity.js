import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Configure Sanity client
const client = sanityClient({
  projectId: 'cqvlnh9n', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your dataset name
  useCdn: true, // Enable CDN for faster responses
  apiVersion: '2023-05-03', // Use the latest API version
});

// Initialize the image URL builder
const builder = imageUrlBuilder(client);

// Function to generate image URLs
function urlFor(source) {
  return builder.image(source);
}

export { client, urlFor };