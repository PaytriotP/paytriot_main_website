import TagsStyles from '@/styles/Tags.module.css';

export default function Tags(props: any) {
  const { tags, limit } = props;

  const hasLimit = typeof limit === 'number';
  const visibleTags = hasLimit ? tags.slice(0, limit) : tags;
  const remainingCount = hasLimit ? tags.length - limit : 0;

  return (
    <ul className={TagsStyles.tags}>
      {visibleTags?.length > 0 &&
        visibleTags?.map((tag: any) => (
          <li className={TagsStyles.tags__tag} key={tag}>
            {tag}
          </li>
        ))}
      {remainingCount > 0 && (
        <li className={TagsStyles.tags__tagMore}>
          +{remainingCount} more
        </li>
      )}
    </ul>
  );
}
