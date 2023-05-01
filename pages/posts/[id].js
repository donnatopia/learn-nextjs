import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

// returns a list of possible values for id
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  }
}

// fetches the necessary data for the blog post using the params.id
export async function getStaticProps({ params }) {
  console.log('params', params);
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}