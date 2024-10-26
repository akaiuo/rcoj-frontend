/**
 * 判题定义
 */

const JUDGE_ENUM = {
  ACCEPTED: "通过",
  MANY_ERROR: "多种错误",
  WRONG_ANSWER: "答案错误",
  COMPILE_ERROR: "编译错误",
  RUNTIME_ERROR: "运行错误",
  TIME_LIMIT_EXCEEDED: "超出时间限制",
  MEMORY_LIMIT_EXCEEDED: "超出内存限制",
  WAITING: "等待中",
  PRESENTATION_ERROR: "格式错误",
  OUTPUT_LIMIT_EXCEEDED: "输出溢出",
  DANGEROUS_OPERATION: "危险操作",
  SYSTEM_ERROR: "系统错误",
};

export default JUDGE_ENUM;
