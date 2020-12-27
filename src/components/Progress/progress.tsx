import { FC, CSSProperties } from "react";
import { ThemeProps } from "../Icon/icon";

export interface ProgressProps {
  /**显示百分比 */
  percent: number;
  /**bar 整体高度 */
  strokeHeight?: number;
  /**是否显示内部文字 */
  showText?: boolean;
  /**样式 */
  styles?: CSSProperties;
  /**主题 */
  theme?: ThemeProps;
}

/**
 * @description: Progress 进度条组件
 * @param {FC<UploadListProps>} props
 * @return {JSX} ReactNode
 */
export const Progress: FC<ProgressProps> = (props) => {
  const { percent, showText, strokeHeight, styles, theme } = props;
  return (
    <div className="axtlive-progress-bar" style={styles}>
      <div
        className="axtlive-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`axtlive-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
};

export default Progress;
