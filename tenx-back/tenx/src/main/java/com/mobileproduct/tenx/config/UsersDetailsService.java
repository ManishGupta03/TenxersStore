package com.mobileproduct.tenx.config;

import com.mobileproduct.tenx.entity.Users;
import com.mobileproduct.tenx.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UsersDetailsService implements UserDetailsService {

    @Autowired
    private UsersRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return loadUserByEmail(username);
    }

    public UserDetails loadUserByEmail(String username) {
        Users users =  repository.findByEmail(username);
        if(users==null){
            throw new UsernameNotFoundException("could not found user..!!");
        }else{
            return new CustomUserDetails(users);
        }
    }
}
