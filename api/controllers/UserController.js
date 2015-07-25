module.exports = {
	create : function (req, res) {
		var user = User.parseBody(req);

		user.id = User.getId();
		user.chatId = User.getId();

		User.findOne({phone : user.phone})
		    .exec( function (err, foundUser) {
		    	if (!foundUser) {
		    		User.create(user)
		    		    .exec(function(err, user) {
							if (err) {
								return res.serverError(err);
							}

							return res.status(200).json({id: user.id, chatId: user.chatId});
						});
		    	}
		    	else
		    	{
		    		return res.serverError('phone already exists');
		    	}});
	},

	get : function (req, res) {
		//Todo, add validation for request

		var id = req.param('id');
		var phone = req.param('phone');
		var criteria = id != null ? {id : id} : {phone : phone};

		User.findOne(criteria)
		    .exec( function(err, user) {
		    	if (err) {
					return res.serverError(err);
				}

				if (!user) {
					return res.notFound();
				}

				return res.status(200).json(user);
		      });
	},

	update : function (req, res) {
		var user = User.parseBody(req);
		user.id = req.param('id');

		User.findOne({id: user.id})
		    .exec( function(err, foundUser) {
		    	if (foundUser) {
		    		user.chatId = foundUser.chatId;

		    		User.update({id : user.id}, user)
					    .exec( function(err, user) {
					    	if (err) {
								return res.serverError(err);
							}

							res.status(200).json(user);
						});
		    	}
		    	else
		    	{
		    		return res.notFound();
		    	}});		
	}	
};

