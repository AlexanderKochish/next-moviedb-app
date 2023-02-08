const PreLoader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        margin: "auto",
        background: "inherite",
        display: "block",
        shapeRendering: "auto",
      }}
      width="204px"
      height="204px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <path
        d="M9 50A41 41 0 0 0 91 50A41 44.8 0 0 1 9 50"
        fill="#a53ca8"
        stroke="none"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1.075268817204301s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 50 51.9;360 50 51.9"
        ></animateTransform>
      </path>
    </svg>
  );
};

export default PreLoader;
