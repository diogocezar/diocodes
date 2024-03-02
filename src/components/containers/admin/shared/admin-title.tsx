type AdminTitleProps = {
  title: string;
  Icon: JSX.Element;
};

export function AdminTitle({ title, Icon }: AdminTitleProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-foreground mb-3 mt-2 flex flex-row gap-2 text-4xl font-bold tracking-tight">
        {Icon}
        {title}
      </h2>
    </div>
  );
}
