import LoadingPage from "../components/modules/LoadingPage";
import Empty from "../components/modules/Empty";
import { isEmpty } from "../helper/data";

const PageRenderer = (PageContent) => {
  return (props) => {
    const { data, isLoading } = props;
    return (
      <>
        {isLoading ? (
          <LoadingPage />
        ) : isEmpty(data) ? (
          <Empty />
        ) : (
          <PageContent data={data} />
        )}
      </>
    );
  };
};

export default PageRenderer;
