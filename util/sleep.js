const sleep = (time) => {
  const start = new Date().getTime();
  while (true) {
    const now = new Date().getTime();
    if (now - start >= time) {
      break;
    }
  }
};

module.exports = sleep;
