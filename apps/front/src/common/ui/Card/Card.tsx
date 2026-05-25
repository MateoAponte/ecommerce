interface CardProps {
  children: React.ReactNode;
  preContent?: React.ReactNode;
  title?: string;
  description?: string;
}

export const Card = ({ children, title, description, preContent }: CardProps) => {
  const hasHeader = title && description;

  return (
    <div className="rounded-2xl bg-surface p-8 shadow-md">
      {preContent}
      {hasHeader && (
        <div className="mb-3">
          <h1 className="fs-2 font-semibold text-primary">{title}</h1>
          <p className="mt-2 fs-6">{description}</p>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};
