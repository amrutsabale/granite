class Comment < ApplicationRecord
  belongs_to :task
  belongs_to :user
  validates :content, presence: true, length: { maximum: 120 }
end
