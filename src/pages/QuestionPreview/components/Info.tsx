const Info = ({ value }: { value: string }) => {
  return (
    <article>
      <ol className="flex flex-col gap-[1.6rem] mt-[2rem] mb-[5rem]">
        {value?.split('\n').map((text, idx) => (
          <li className="body_1_18_m text-[#808087]" key={`${idx},${text}`}>
            {text}
          </li>
        ))}
      </ol>
    </article>
  );
};

export default Info;
