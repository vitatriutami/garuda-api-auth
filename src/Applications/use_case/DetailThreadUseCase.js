const CommentDetail = require("../../Domains/comments/entities/DetailComment");
const ReplyDetail = require("../../Domains/replies/entities/DetailReply");

class DetailThreadUseCase {
  constructor({ threadRepository, commentRepository, replyRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
  }

  async execute(threadId) {
    const thread = await this._threadRepository.getThreadById(threadId);
    const comments = await this._commentRepository.getCommentByThreadId(
      threadId
    );
    const replies = await this._replyRepository.getRepliesByThreadId(threadId);

    thread.comments = this._getCommentAndReplies(comments, replies);

    return thread;
  }

  _getCommentAndReplies(comments, replies) {
    return comments.map((comment) => {
      comment.replies = replies
        .filter((reply) => reply.comment_id === comment.id)
        .map((repl) => new ReplyDetail(repl));

      return new CommentDetail(comment);
    });
  }
}

module.exports = DetailThreadUseCase;
