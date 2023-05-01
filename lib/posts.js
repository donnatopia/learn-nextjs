import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// process.cwd() is used to get the current working directory of the node.js process
const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {

  // get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  // get all the posts data by mapping through fileNames
  const allPostsData = fileNames.map((fileName) => {

    // removes the ".md" from file name to get the id
    const id = fileName.replace(/\.md$/, '');

    // read the markdown file as a string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  // sort all the posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  })
}