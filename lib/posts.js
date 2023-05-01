import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// process.cwd() is used to get the current working directory of the node.js process
const postsDirectory = path.join(process.cwd(), 'posts');


/* ==========================================

  Returns all posts data in { id, title, date }

============================================= */

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
};

/* ==========================================

  Returns all post id as { params: { id: string } }

============================================= */

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      },
    };
  });
};

/* ==========================================

  Returns all the post data based on id as { id, data }

============================================= */

export async function getPostData(id) {
  // find the file based on the id name
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  // return the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}