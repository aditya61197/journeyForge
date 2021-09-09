package com.stackroute.journeyservice.Domain;

import java.util.List;

public interface DomainService {

    Domain createDomain(Domain domain, String username);

    void deleteDomainByDomainId(String domainId) throws Exception;

    Domain updateDomainByDomainId(Domain domain) throws Exception;

    List<Domain> getAllDomains(String username);

    List<Domain> getClientDomains();

    Domain getDomainByDomainId(String domainId);

    Domain findById(String domainId);
}
