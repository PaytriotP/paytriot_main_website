import PublishedDate from '@/components/blog//Post/PublishedDate';
import ExternalUrl from '@/components/blog/Post/ExternalUrl';
import Tags from '@/components/blog/Post/Tags';
import RichTextPageContent from '@/components/blog/RichTextPageContent';
import RichTextPageContentStyles from '@/styles/RichTextPageContent.module.css';
import TypographyStyles from '@/styles/Typography.module.css';
import Link from 'next/link';


export default function Post(props: any) {
  const { post } = props;

  return (
    <article className={RichTextPageContentStyles.page}>
      {post.externalUrl && <ExternalUrl url={post.externalUrl} />}
      <PublishedDate date={post.date} />
      {post.tags !== null && <Tags tags={post.tags} />}
      <h1 className={TypographyStyles.heading__h1}>{post.title}</h1>
      <RichTextPageContent richTextBodyField={post.body} renderH2Links={true} />
      <section className={RichTextPageContentStyles.ctaSection}>
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of users who trust us for seamless transactions. Sign up now and take your business to the next level!</p>
        <Link href="/signup-form">
          <a className={RichTextPageContentStyles.ctaButton}>Get Started</a>
        </Link>
      </section>
      {/* {post.author !== null && <Author author={post.author} />} */}
    </article>
  );
}
