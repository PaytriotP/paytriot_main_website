import ContentfulApi from '@/components/ContentfulApi';
import { Config } from '@/components/Config';
import PageMeta from '@/components/blog/PageMeta';
import PostList from '@/components/blog/PostList';
import RichTextPageContent from '@/components/blog/RichTextPageContent';
import MainLayout from '@/layouts/main';
import ContentWrapper from '@/components/blog/ContentWrapper';
import PageContentWrapper from '@/components/blog/PageContentWrapper';
import HeroBanner from '@/components/blog/HeroBanner';

import ContentListStyles from '@/styles/ContentList.module.css';

export default function BlogIndexPage(props: any) {
  const { postSummaries, totalPages, currentPage, pageContent, preview } =
    props;

  /**
   * This provides some fallback values to PageMeta so that a pageContent
   * entry is not required for /blog
   */
  const pageTitle = pageContent ? pageContent.title : 'Paytriot Blog';
  const pageDescription = pageContent
    ? pageContent.description
    : 'Sectors that Paytriot works with and the services we can provide them. Find out how crypto payment rails are shaping the future of global transactions.';

  return (
    <MainLayout preview={preview}>
      <PageMeta
        title={`${pageTitle} Page ${currentPage}`}
        description={`${pageTitle} Page ${currentPage}`}
        url={`${Config.pageMeta.blogIndex.url}/page/${currentPage}`}
      />

      {pageContent?.heroBanner !== null && (
        <HeroBanner data={pageContent?.heroBanner} />
      )}

      <ContentWrapper large>
        <div className={ContentListStyles.blogHeader}>
          <h1 className={ContentListStyles.blogHeader__title}>Latest Insights</h1>
          {pageContent?.body && (
            <RichTextPageContent richTextBodyField={pageContent.body} />
          )}
        </div>
        <PostList
          posts={postSummaries}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </ContentWrapper>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const totalPosts = await ContentfulApi.getTotalPostsNumber();
  const totalPages = Math.ceil(totalPosts / Config.pagination.pageSize);

  const paths = [];

  /**
   * Start from page 2, so we don't replicate /blog
   * which is page 1
   */
  for (let page = 2; page <= totalPages; page++) {
    paths.push({ params: { page: page.toString() } });
  }

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({
  params,
  preview = false
}: {
  params: any;
  preview: boolean;
}) {
  const postSummaries = await ContentfulApi.getPaginatedPostSummaries(
    params.page
  );
  const totalPages = Math.ceil(
    postSummaries.total / Config.pagination.pageSize
  );
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.blogIndex.slug,
    {
      preview: preview
    }
  );

  return {
    props: {
      preview,
      postSummaries: postSummaries.items,
      totalPages,
      currentPage: params.page,
      pageContent: pageContent || null
    }
  };
}
