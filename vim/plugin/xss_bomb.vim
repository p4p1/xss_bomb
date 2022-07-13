" Description:	A plugin to work with XSS Bomb from VIM
" Author:		p4p1 aka Leo Smith

" let s:login_text = [
" 	\ ' Login',
" 	\ '     Username: ',
" 	\ '     Password: ',
" 	\ ]


function xss_bomb#UpdateFile(url, token)
	let l:source = join(getline(1, '$'), '\n')
	let l:ret = system("curl --location --request POST '" . a:url . "/user/set_code' --header 'Authorization: Bearer " . a:token . "' --header 'Content-Type: application/json' --data-raw '{\"code\": \"" . l:source . "\"}'")
endfunction

function xss_bomb#Login(username, password, otp_code)
	let l:get_token = system("curl --silent --location --request POST '" . g:xss_bomb_url . "/auth/login' --header 'Content-Type: application/json' --data-raw '{ \"username\": \"" . a:username . "\",\"password\": \"" . a:password . "\", \"otp_code\": \"" . a:otp_code . "\", \"notificationId\": \"vim\"}'  | jq .token | cut -d '\"' -f2 | tr -d '\n'")
	let l:ref_token = system("curl --silent --location --request GET '" . g:xss_bomb_url . "/auth/refresh' --header 'Authorization: Bearer " . l:get_token . "' --data-raw ''  | jq .token | tr -d '\"' | tr -d '\n'")
	if l:get_token == "null" || l:ref_token == "null"
		echo "Error Could not login"
		return "null"
	endif
	return l:ref_token
endfunction

" Main function for the plugin
function xss_bomb#main()
	bd
	let l:username = input("Enter Username: ")
	let l:password = inputsecret("Enter Password: ")
	let l:otp_code = inputsecret("2FA Code: ")
	let l:url = g:xss_bomb_url

	let l:ref_token = xss_bomb#Login(l:username, l:password, l:otp_code)

	let l:code = system("curl --silent --location --request GET '" . l:url . "/user/get_code' --header 'authorization: Bearder " . l:ref_token . "' | jq .code | tr -d '\"' | tr -d '\n'")
	let l:file = system("mktemp")
	execute 'edit' l:file
	execute "normal! i" . l:code
	silent! %s/\\n/\r/g
	let g:xss_bomb_url = l:url
	let g:xss_bomb_token = l:ref_token
	autocmd BufWritePost * call xss_bomb#UpdateFile(g:xss_bomb_url, g:xss_bomb_token)
endfunction
