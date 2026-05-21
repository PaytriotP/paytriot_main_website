import ContentWrapperStyles from '@/styles/ContentWrapper.module.css';

export default function ContentWrapper({ children, large }) {
  return (
    <div
      className={
        large
          ? ContentWrapperStyles.containerLarge
          : ContentWrapperStyles.container
      }
    >
      {children}
    </div>
  );
}
