package com.service;

import com.entity.Activity;
import com.entity.Files;
import com.entity.User;
import com.repository.ActivityRepository;
import com.repository.FileRepository;
import com.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;
    @Autowired
    private ActivityRepository activityRepository;

    public List<Files> findByEmail(String email){
        return fileRepository.findByEmail(email);
    }

    public void addFiles(Files f){fileRepository.save(f);}
    public void removeFiles(Files f){
        List<Files> fDelete=fileRepository.findByEmailAndFilename(f.getEmail(),f.getFilename());
        for (Files file : fDelete) {
            fileRepository.delete(file);
        }

    }
    public void addActivity(Activity a){activityRepository.save(a);}
    public List<Activity> getActivity(String email){return activityRepository.findByEmail(email);}
}
