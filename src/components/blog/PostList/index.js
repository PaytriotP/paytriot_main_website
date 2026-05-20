import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import PublishedDate from '@/components/blog//Post/PublishedDate';
import Tags from '@/components/blog//Post/Tags';
import Pagination from '@/components/blog//PostList/Pagination';
import ContentListStyles from '@/styles/ContentList.module.css';
import ReactMarkdownRenderers from '@/utils/ReactMarkdownRenderers';
import { Config } from '@/utils/Config';
// import Image from 'next/image';

export default function PostList(props) {
  const { posts, currentPage, totalPages } = props;
  const nextDisabled = parseInt(currentPage, 10) === parseInt(totalPages, 10);
  const prevDisabled = parseInt(currentPage, 10) === 1;

  return (
    <>
      <ol className={ContentListStyles.contentList}>
        {posts.map(post => (
          <li key={post.sys.id}>
            <article className={ContentListStyles.contentList__post}>
              <div className={ContentListStyles.contentList__thumbnail}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/img-logo.svg"
                  alt="Paytriot Logo"
                  className={ContentListStyles.contentList__thumbnailImg}
                />
              </div>
              <div className={ContentListStyles.contentList__content}>
                {post.tags !== null && <Tags tags={post.tags} limit={3} />}
                <Link
                  href={`/blog/${post.slug}`}
                  className={ContentListStyles.contentList__titleLink}
                >
                  <h2 className={ContentListStyles.contentList__title}>
                    {post.title}
                  </h2>
                </Link>

                <div className={ContentListStyles.contentList__excerpt}>
                  <ReactMarkdown
                    // eslint-disable-next-line no-use-before-define
                    // children={post.excerpt}
                    renderers={ReactMarkdownRenderers(post.excerpt)}
                  >
                    {post.excerpt}
                  </ReactMarkdown>
                </div>
                <PublishedDate date={post.date} />
                {/* <ReadMoreButton /> */}
              </div>
            </article>
          </li>
        ))}
      </ol>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        nextDisabled={nextDisabled}
        prevDisabled={prevDisabled}
      />
    </>
  );
}
