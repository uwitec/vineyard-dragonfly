class Image < ActiveRecord::Base
	belongs_to :resource ;

	attr_accessible :photo
	has_attached_file :photo,
		:url => "/system/:class/:attachment/:id/:style.:extension",
		:path => ":rails_root/public/system/:class/:attachment/:id/:style.:extension",
		:styles => { :thumb => ["80x80#",:png],:medium => ["280x280#",:png],:large => ["600x400#",:png]},
		:convert_options => { :thumb => "-quality 100"},
		:default_url => "empty_profile.png"
	validates_attachment :photo, :presence => true,
		:content_type => { :content_type => ["image/jpg","image/png","image/jpeg"]}, :size => { :in => 0..10.kilobytes }
end
