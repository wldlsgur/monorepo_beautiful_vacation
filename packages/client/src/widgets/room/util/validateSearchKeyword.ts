interface Keyword {
  keyword: string;
}

const validateSearchKeyword = ({ keyword }: Keyword) => {
  return /^[가-힣a-zA-Z0-9]+$/.test(keyword);
};

export default validateSearchKeyword;
