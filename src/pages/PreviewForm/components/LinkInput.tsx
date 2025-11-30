const CONTAINER_CLASSNAME =
  'flex items-center justify-between rounded-[1.2rem] py-[1.2rem] px-[2.2rem] text-gray-300 bg-[#f5f5f5] gap-[1.6rem]';
const LABEL_CLASSNAME = 'w-[fit-content] body_1_18_m';
const LINK_CLASSNAME =
  'overflow-hidden text-ellipsis whitespace-nowrap font-weight-600 placeholder:text-gray-100 w-[62rem]';

const LinkInput = ({ urls }: { urls: string[] }) => {
  return (
    <>
      {urls.length === 1 && (
        <div className={CONTAINER_CLASSNAME}>
          <span className={LABEL_CLASSNAME}>링크</span>
          <a
            className={LINK_CLASSNAME}
            href={urls[0]}
            target="_blank"
            rel="noreferrer noopener"
          >
            {urls[0]}
          </a>
        </div>
      )}
      {urls.length > 1 &&
        urls.map((url, idx) => (
          <div key={url} className={CONTAINER_CLASSNAME}>
            <span className={LABEL_CLASSNAME}>링크 {idx + 1}</span>
            <a
              className={LINK_CLASSNAME}
              href={url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {url}
            </a>
          </div>
        ))}
    </>
  );
};

export default LinkInput;
