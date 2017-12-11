package com.repository;

import com.entity.Activity;
import com.entity.Files;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ActivityRepository extends CrudRepository<Activity, Long> {
    List<Activity> findByEmail(String email);

}
