import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader: React.FC = (): React.ReactElement => (
  <ContentLoader 
    speed={2}
    width={289}
    height={56}
    viewBox="0 0 289 56"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    // {...props}
  >
    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
    <circle cx="25" cy="25" r="25" /> 
    <rect x="60" y="35" rx="4" ry="4" width="220" height="14" /> 
    <rect x="60" y="0" rx="4" ry="4" width="85" height="16" />
  </ContentLoader>
)

export default MyLoader