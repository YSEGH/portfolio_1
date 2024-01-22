import { useEffect, useState } from "react";
import TagCloud, { Tag } from "./src/TagCloud";
import style from "./style/index.module.css";

const index = () => {
  const tags = [
    { id: 1, name: "React", rate: 5 },
    { id: 2, name: "Typescript", rate: 3.9 },
    { id: 3, name: "HTML", rate: 5 },
    { id: 4, name: "CSS", rate: 5 },
    { id: 5, name: "PHP", rate: 4.4 },
    { id: 6, name: "Symfony", rate: 4 },
    { id: 7, name: "Drupal", rate: 4.1 },
    { id: 8, name: "Wordpress", rate: 3.8 },
    { id: 9, name: "PayloadCMS", rate: 4.2 },
    { id: 10, name: "MongoDB", rate: 3.9 },
    { id: 11, name: "MySQL", rate: 4.2 },
    { id: 12, name: "Javascript", rate: 5 },
    { id: 13, name: "VueJS", rate: 4.1 },
    { id: 14, name: "Sass", rate: 4.4 },
    { id: 15, name: "Strapi", rate: 4 },
    { id: 16, name: "NextJS", rate: 3 },
    { id: 17, name: "Bootstrap", rate: 4.1 },
    { id: 18, name: "Linux", rate: 5 },
    { id: 19, name: "AWS", rate: 4.1 },
    { id: 20, name: "ThreeJS", rate: 4.1 },
    { id: 21, name: "Webpack", rate: 4.4 },
  ];

  const [tag, setTag] = useState<Tag | null>(null);

  const setTagHandler = (selectedTag: string) => {
    const currentTag = tags.find((tag) => tag.name === selectedTag) || null;
    setTag(currentTag);
  };

  useEffect(() => {
    let app = new TagCloud("tag-cloud", tags, setTagHandler);
    app.init();
    return () => {};
  }, []);

  useEffect(() => {}, [tag]);

  return (
    <div className={style.container__tag_cloud}>
      <div id="tag-cloud" style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
};

export default index;
