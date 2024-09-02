import { ReactNode } from "react";
import "./pageContainer.css";
export default function PageContainer({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  return (
    <div>
      <div className="page-container">{children}</div>
    </div>
  );
}
