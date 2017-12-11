package com.repository;

import com.entity.Files;
import com.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FileRepository extends CrudRepository<Files, Long> {
    List<Files> findByEmail(String email);
    List<Files> findByEmailAndFilename(String email,String filename);



}
