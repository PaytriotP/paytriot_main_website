import PublishedDate from '@/components/blog/Post/PublishedDate';
import ExternalUrl from '@/components/blog/Post/ExternalUrl';
import RichTextPageContent from '@/components/blog/RichTextPageContent';
import Link from 'next/link';
import RichTextPageContentStyles from '@/styles/RichTextPageContent.module.css';

export default function Post(props: any) {
  const { post } = props;

  // Extract the first image from the body if available
  const bodyAssets = post.body?.links?.assets?.block || [];
  const firstImage = bodyAssets.find((asset: any) => asset && asset.url);

  // Calculate reading time based on length of body text (roughly 200 words per minute)
  const textContent = post.body?.json?.content
    ?.map((node: any) => node.content?.map((c: any) => c.value).join(' '))
    .join(' ') || '';
  const wordCount = textContent.split(/\s+/).filter(Boolean).length || 200;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className={RichTextPageContentStyles.page}>
      {/* Dynamic Originally published banner */}
      {post.externalUrl && <ExternalUrl url={post.externalUrl} />}

      <header className={RichTextPageContentStyles.postHeader}>
        {/* Date */}
        <span className={RichTextPageContentStyles.postDate}>
          <PublishedDate date={post.date} />
        </span>

        {/* Title */}
        <h1 className={RichTextPageContentStyles.postTitle}>{post.title}</h1>

        {/* Author Meta Bar */}
        {post.author && (
          <div className={RichTextPageContentStyles.metaBar}>
            {post.author.image?.url && (
              <div className={RichTextPageContentStyles.authorAvatar}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.author.image.url} alt={post.author.name} />
              </div>
            )}
            <div className={RichTextPageContentStyles.metaInfo}>
              <span className={RichTextPageContentStyles.authorName}>
                {post.author.name} • Paytriot Insights
              </span>
              <span className={RichTextPageContentStyles.readTime}>
                {readTime} min read • {post.author.description || 'Fintech Analyst'}
              </span>
            </div>
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className={RichTextPageContentStyles.tagGroup}>
            {post.tags.map((tag: string, index: number) => (
              <span
                key={tag}
                className={`${RichTextPageContentStyles.tagPill} ${
                  index === 0 ? RichTextPageContentStyles.tagPillBrand : ''
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Featured Cover Image */}
      {firstImage && (
        <div className={RichTextPageContentStyles.heroImageContainer}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={RichTextPageContentStyles.heroImage}
            src={firstImage.url}
            alt={firstImage.title || post.title}
          />
        </div>
      )}

      {/* Content Body */}
      <section className={RichTextPageContentStyles.page__content}>
        <RichTextPageContent richTextBodyField={post.body} renderH2Links={true} />
      </section>

      {/* CTA Box */}
      <div className={RichTextPageContentStyles.ctaSection}>
        <h2>Ready to accept Crypto Payments?</h2>
        <p>
          Join thousands of UK and European merchants using Paytriot to power their online checkouts. Get set up with a merchant account in 24 hours.
        </p>
        <Link href="/signup-form" passHref legacyBehavior>
          <a className={RichTextPageContentStyles.ctaButton}>Get Started Now</a>
        </Link>
      </div>
    </article>
  );
}
