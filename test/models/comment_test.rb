require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  def setup
    @user = User.create(name: 'Sam Smith',
                        email: 'sam@example.com',
                        password: 'welcome',
                        password_confirmation: 'welcome')
    @task = @user.tasks.new(title: 'This is a test task')
    @comment = @task.comments.new(content: 'This is a test comment')
    @comment.user = @user
  end

  def test_comment_should_be_invalid_without_content
    @comment.content = ''
    assert @comment.invalid?
  end

  def test_comment_content_should_not_exceed_maximum_length
    @comment.content = 'a' * 121
    assert @comment.invalid?
  end

  def test_valid_comment_should_be_saved
    assert_difference 'Comment.count' do
      @comment.save
    end
  end

  def test_comment_should_not_be_valid_without_user
    @comment.user = nil
    assert @comment.invalid?
  end

  def test_comment_should_not_be_valid_without_task
    @comment.task = nil
    assert @comment.invalid?
  end
end
