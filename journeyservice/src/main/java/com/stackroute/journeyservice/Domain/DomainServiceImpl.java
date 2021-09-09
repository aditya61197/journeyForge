package com.stackroute.journeyservice.Domain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DomainServiceImpl implements DomainService {

    private final DomainRepository domainRepository;

    @Autowired
    public DomainServiceImpl(DomainRepository domainRepository) {
        this.domainRepository = domainRepository;
    }

    @Override
    public Domain createDomain(Domain domain, String username) {
        domain.setDomainId(UUID.randomUUID().toString());
        domain.setDomainDescription(domain.getDomainDescription());
        domain.setDomainUpdatedBy(username);
        domain.setDomainUpdatedOn(LocalDateTime.now());
        domain.setDomainCreatedOn(LocalDateTime.now());
        domain.setDomainImage(domain.getDomainImage());
        domain.setTags(domain.getTags());
        domain.setDomainCreatedBy(username);
        return domainRepository.insert(domain);

    }

    @Override
    public void deleteDomainByDomainId(String domainId) throws Exception {
        Optional<Domain> DomainDB = this.domainRepository.findById(domainId);
        if (DomainDB.isPresent()) {
            this.domainRepository.delete(DomainDB.get());
        } else {
            throw new Exception("Domain not found");
        }

    }

    @Override
    public Domain updateDomainByDomainId(Domain domain) throws Exception {
        Optional<Domain> DomainDB = this.domainRepository.findById(domain.getDomainId());

        if (DomainDB.isPresent()) {
            Domain domain1 = DomainDB.get();
            domain1.setDomainName(domain.getDomainName());
            domain1.setDomainDescription(domain.getDomainDescription());
            domain1.setDomainCreatedBy(domain.getDomainCreatedBy());
            domain1.setDomainUpdatedBy(domain.getDomainCreatedBy());
            domain1.setDomainUpdatedOn(LocalDateTime.now());
            domain1.setDomainImage(domain.getDomainImage());
            domain1.setTags(domain1.getTags());
            domainRepository.save(domain1);
            return domain1;
        } else {
            throw new Exception("Domain not found with given id");

        }

    }

    @Override
    public List<Domain> getAllDomains(String username) {
        return domainRepository.findByDomainCreatedBy(username);
    }

    @Override
    public List<Domain> getClientDomains() {
        return domainRepository.findAll();
    }

    @Override
    public Domain getDomainByDomainId(String domainId) {
        Domain domain = domainRepository.findById(domainId).get();
        return domain;
    }

    @Override
    public Domain findById(String domainId) {
        Domain domain = domainRepository.findById(domainId).get();
        return domain;
    }
}
