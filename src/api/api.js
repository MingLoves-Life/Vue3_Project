const BASEURL = "http://localhost:3000/";

const URL = {
  registerUser: BASEURL + "register",
  login: BASEURL + "login",
  person: BASEURL + "person",
  todo: BASEURL + "person/todo",
  account: BASEURL + "account",
  addAccount: BASEURL + "account/add",
  accountList: BASEURL + "account/list",
  accountDelete: BASEURL + "account/delete",
  change: BASEURL + "account/change",
  upload: BASEURL + "upload",
  articalList: BASEURL + "article/list",
  articalDelete: BASEURL + "article/delete",
  auditList: BASEURL + "audit",
  auditAgree: BASEURL + "audit/agree",
  auditRefuse: BASEURL + "audit/refuse",
  reader: BASEURL + "reader",
  readerReply: BASEURL + "reader/reply",
  task: BASEURL + "task",
  taskAdd: BASEURL + "task/add",
  taskChoose: BASEURL + "task/choose",
};

module.exports = URL;
