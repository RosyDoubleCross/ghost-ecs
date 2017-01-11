'use strict';

const config = {
	production: {
		url: process.env.GHOST_URL,
		mail: {
			transport: 'SMTP',
			options: {
				host: process.env.GHOST_SES_HOST || 'email-smtp.us-east-1.amazonaws.com',
				port: process.env.GHOST_SES_PORT || '465',
				service: 'SES',
				auth: {
					user: process.env.GHOST_SES_ACCESS_KEY_ID,
					pass: process.env.GHOST_SES_SECRET_ACCESS_KEY,
				},
			},
			from: process.env.GHOST_SES_FROM,
		},
		database: {
			client: process.env.GHOST_DATABASE_CLIENT || 'pg',
			connection: {
				host: process.env.GHOST_DATABASE_HOST,
				user: process.env.GHOST_DATABASE_USER,
				password: process.env.GHOST_DATABASE_PASSWORD,
				database: process.env.GHOST_DATABASE_DATABASE,
				port: process.env.GHOST_DATABASE_PORT || '5432',
				charset: process.env.GHOST_DATABASE_CHARSET || 'utf8',
			},
		},
		storage: {
			active: 'ghost-s3',
			'ghost-s3': {
				accessKeyId: process.env.GHOST_S3_ACCESS_KEY_ID,
				secretAccessKey: process.env.GHOST_S3_SECRET_ACCESS_KEY,
				bucket: process.env.GHOST_S3_BUCKET,
				region: process.env.GHOST_S3_REGION || 'us-east-1',
			},
		},
		server: {
			host: process.env.GHOST_HOST || '0.0.0.0',
			port: process.env.GHOST_PORT || '2368',
		},
	},
};

module.exports = config;
